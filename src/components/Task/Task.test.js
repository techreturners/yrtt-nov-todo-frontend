/* eslint-disable jest/valid-title */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Task from './Task'

describe('Task component', () => {
    afterEach(() => jest.clearAllMocks())

    test(`
        Given the required props,
        When the component is rendered,
        Then the task text should be present`, () => {
            const requiredProps ={
                complete: false, 
                text: "This is a task", 
                id:"001", 
                deleteTask: () => {}
            }

            render(<Task { ...requiredProps } />)

            expect(screen.getByText("This is a task")).toBeInTheDocument()
        })

    test(`
        Given the required props,
        When the component is rendered,
        Then the delete button should be present`, () => {
            const requiredProps ={
                complete: false, 
                text: "This is a task", 
                id:"001", 
                deleteTask: () => {}
            }

            render(<Task { ...requiredProps } />)

            expect(screen
                .getAllByRole("button")
                .filter(button => button.textContent === "Delete").length)
                .toBe(1)
        })

    test(`
        Given a completed task,
        When the component is rendered,
        Then the complete button should not be present`, () => {
            const completedTaskProps ={
                complete: true, 
                text: "This is a task", 
                id:"001", 
                deleteTask: () => {}
            }

            render(<Task { ...completedTaskProps } />)

            expect(screen
                .getAllByRole("button")
                .filter(button => button.textContent === "Complete").length)
                .toBe(0)
        })

    test(`
        Given an incomplete task,
        When the component is rendered,
        Then the complete button should be present`, () => {
            const incompleteTaskProps ={
                complete: false, 
                text: "This is a task", 
                id:"001", 
                deleteTask: () => {}
            }

            render(<Task { ...incompleteTaskProps } />)

            expect(screen
                .getAllByRole("button")
                .filter(button => button.textContent === "Complete").length)
                .toBe(1)
        })

    test(`
        Given a task is rendered,
        When the delete button is clicked,
        Then the delete task function is called with the correct task id`, () => {
            const mockDeleteFunction = jest.fn()
            const testTaskId = "001"

            const requiredProps ={
                complete: false, 
                text: "This is a task", 
                id:testTaskId, 
                deleteTask: mockDeleteFunction
            }

            render(<Task { ...requiredProps } />)

            const deleteButton = screen.getAllByRole("button").find(button => button.textContent === "Delete")
            userEvent.click(deleteButton)

            expect(mockDeleteFunction).toHaveBeenCalledWith(testTaskId)
        })
})