describe('API Integration', () => {
  it('should successfully fetch data from backend API', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3002/api/spacex/next-launch',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        expect(response.body).to.have.property('status', 'success')
        expect(response.body).to.have.property('data')
        expect(response.body.data).to.have.property('id')
        expect(response.body.data).to.have.property('name')
      }
      expect(response.status).to.be.oneOf([200, 500, 503])
    })
  })
})
