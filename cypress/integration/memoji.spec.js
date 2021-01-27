describe('Solving', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not solve the game while shuffling', () => {
    // click the h1 element
    cy.get('h1').click();

    // check if masking div does not appear
    cy.get('.user-clicked-solve').should('not.exist');
  });

  it('should solve the game after shuffle', () => {
    // wait for on load shuffle to finish
    cy.wait(2500);

    // click the h1 element
    cy.get('h1').click();

    // check if masking div appears
    cy.get('.user-clicked-solve').should('exist');

    // wait until solved
    cy.wait(36000); // 3000 * 12

    // ensure game was solved
    cy.get('#canvas-confetti').should('exist');
  });
});

describe('Hovercard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not add visible class to hovercard during shuffle', () => {
    // hover
    cy.get('h1').trigger('mouseover');

    // get hovercard
    cy.get('.hover-card-container').should('not.have.class', 'visible');
  });

  it('should add visible class to hovercard after shuffle', () => {
    // wait for shuffle to finish
    cy.wait(2500);

    // hover
    cy.get('h1').trigger('mouseover');

    // get hovercard
    cy.get('.hover-card-container').should('have.class', 'visible');
  });
});

describe('Tallies', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should increment attempts and matches together', () => {
    // wait for shuffle to finish
    cy.wait(2500);

    // click the h1 element
    cy.get('h1').click();

    // iterate
    for (let i = 0; i <= 12; i++) {
      cy.contains('.attempts', i);
      cy.contains('.matches', i);
      if (i < 12) {
        cy.wait(3000);
      }
    }
  });

  it('should increment attempts and matches independently', () => {
    // wait for shuffle to finish
    cy.wait(2500);

    // click random cards:
    // chances are unlikely that 5 consecutive matches will be found;
    // expect attempts and matches to be different values
    let randomCard;
    for (let i = 0; i < 5; i++) {
      // matched .card divs are removed from DOM
      // therefore, the following will only retrieve unmatched cards
      cy.get('.card').then($cards => {
        // get random number
        randomCard = Math.floor(Math.random() * ($cards.length - 1));
        // click cards
        $cards[randomCard].click();
        $cards[randomCard + 1].click();
        // wait
        cy.wait(2000);
      });
    }

    // compare tallies
    cy.get('.attempts > span').then($attempts => {
      cy.get('.matches > span').then($matches => {
        // parse attempts and matches, then compare
        const attempts = parseInt($attempts.text().slice(-1), 10);
        const matches = parseInt($matches.text().slice(-1), 10);
        expect(attempts).to.not.equal(matches);
      });
    });
  });
});

describe('Shuffle', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should shuffle the cards in a different order', () => {
    // wait for shuffle to finish
    cy.wait(2500);

    // get on load board
    cy.get('.board').then($onLoadBoard => {
      // cache on load children
      const onLoadBoardChildren = [...$onLoadBoard.children()];

      // shuffle the cards
      cy.get('button').click();

      // wait for shuffle to finish
      cy.wait(2500);

      // get shuffled board
      cy.get('.board').then($shuffledBoard => {
        expect(onLoadBoardChildren.length).to.equal(
          $shuffledBoard[0].children.length
        );

        // compare
        let areEqual = true;
        for (let i = 0; i < onLoadBoardChildren.length; i++) {
          // if previous .card dataset.emoji does not equal
          // current .card dataset.emoji,
          // then the cards are considered to be
          // in a different order and not equal
          if (
            onLoadBoardChildren[i].firstElementChild.dataset.emoji !==
            $shuffledBoard[0].children[i].firstElementChild.dataset.emoji
          ) {
            areEqual = false;
            break;
          }
        }

        expect(areEqual).to.be.false;
      });
    });
  });
});
