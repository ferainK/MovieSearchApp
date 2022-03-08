describe('영화검색', () => {
  it('검색페이지 접근', () => {
    cy.visit('/')
    cy.get('header .nav-link.active')
      .contains('Search')
  })
  it('조건에 따라 영화를 검색', () => {
    cy.get('input.form-control')
      .type('frozen')
    cy.get('select.form-select:nth-child(2)')
      .select('30')
    cy.get('button.btn-primary')
      .click()
    cy.wait(2000)
    //movie class 갯수 확인
    cy.get('.movie')
      //should('조건', '값')
      .should('have.length', 30)
  })

  it('영화 아이템 선택', () => {
    cy.get('.movie .title')
      .contains('Frozen II')
      .click()
  })
  it('영화 상세 정보를 확인', ( () => {
    cy.url()
      .should('include', '/movie/tt4520988')
    cy.wait(1000)
    cy.get('header .nav-link.active')
      .contains('Movie')
    cy.get('.title')
      .contains('Frozen II')
  }))
})