import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App'

describe('App', () => {
    const server = setupServer(
        rest.get('https://wv05gxoqdi.execute-api.eu-west-2.amazonaws.com/dev/users/9a688c69-3f66-4874-aefa-5dfcd44110d5/tasks', (req, res, ctx) => {
          return res(ctx.body([
              { description: 'Buy cat food', completed: false, taskId: '001'},
              { description: 'Clean the kitchen', completed: true, taskId: '002'}
            ]))
        })
    )
      
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())


    test(`Given the app is rendered,
    When the data is requested from the back-end,
    Then the tasks data is rendered on screen`, async () => {

        render(<App />)
        expect(await screen.findByText("Buy cat food")).toBeInTheDocument();
        expect(await screen.findByText("Clean the kitchen")).toBeInTheDocument();
    })
})