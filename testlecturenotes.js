// all test files should be named component.test.js
//npm test -- --verbose to get more details against each test
//npm test -- --clearCache to clear cache
//npm test -- --coverage and then /coverage index.html open in explorer for ui coverage
//www.testing-library.com

//common Jest matchers toBe toHaveLength toHaveProperty toBeGreaterThan toHaveBeenCalledTimes(2) toHaveBeenCalledWith(10) toHaveReturnedWith(42)

const { render, prettyDOM, fireEvent } = require("@testing-library/react");

import '@testing-library/jest-dom'; //brings in DOM specific assertions eg toBeInDocument toHaveClass toHaveValue

//Jest testing for JS functions
describe("My first tests", () => {
  //also test('')
  it('performs a simple test', () => {
    expect(true).toBeTruthy();
    expect(5).toBe(4);
  });

});

describe("My helper functions", () => {

  it('should return a count of friends', () => {
    const count = getFriendCount(data); //import helper function. where data is fixed data array of object [{},{},{}]
    expect(count).toBe(4); //the function should return 4 , as in the length of data

  })

  it('should return correct friend names', () => {
    const names = getFriendNames(data); //returns an array of names
    expect(names.length).toBe(4); //doesnt check for names, just length
    expect(names).toContain("Freddy Mercury");
  })

  it('adds new friend', () => {
    const moreFriends = addFriends(data, "Nathan Brown", 5); //returns an array of objects
    expect(moreFriends.length).toBe(5); //doesnt check for names, just length
    const nathan = { 'name': "Nathan", 'uid': 5 }
    expect(moreFriends).toContainEqual(nathan);//use toContainEqual for accessing complex objects
  })


  it('removes friend', () => {
    const bestFriends = removeFriends(data, 4);
    expect(bestFriends.length).toBe(3);
    const tom = { 'name': "Tom Cruise", 'uid': 4 }
    expect(bestFriends).not.toContainEqual(tom);// same as above but using .not.
  })

})



//Testing library to test component in react
//queries getBy is self asserting. queryBy is not self asserting. findBy is async, does an api call, returns a promise.
describe('FriendList tests', () => {

  it('should render with no props', () => {
    render(<FriendList />)
  })

  it('render with items prop', () => {
    render(<FriendList items={data} />)
  })

  it('render with items prop and produces list', () => {
    const { container, getByRole } = render(<FriendList items={data} />); //returns complicated DOM object containing Container
    //console.log(container);//still complicated but better
    console.log(prettyDOM(container));//show the <div> <ul> etc much easier to view
    const list = getByRole("list");//for <ul>
    const items = getAllByRole("listitem") //for <li>. getAllBy if there are multiple options
    expect(items.length).toBe(4); //4 items in the array returned by items

  })


  it('calls deleteItem when item clicked', () => {
    //mock function to pass to props
    const deleteItem = jest.fn();
    const { getByText } = render(<FriendList items={data} deleteItem={deleteItem} />);

    const james = getByText("James Holden");//has to be the exact text content and finds the element related to it
    fireEvent.click(james);//click, submit, change etc

    expect(deleteItem).toHaveBeenCalled;//was the function associated with onClick called
    expect(deleteItem).toHaveBeenCalledTimes(1);
    expect(deleteItem).toHaveBeenCalledWith("3");

  })

})


//Full integration testing App.test.js

describe('App component tests -end to end', () => {

  it('should render with no props and accept input', () => {
   const {container, getByRole, getByDisplayValue} = render(<Application />)
   console.log(prettyDom(container));//shows entire tree
   const input = getByRole("textbox");
   fireEvent.change(input, {target: {value: "Nathan Brown"}});
   getByDisplayValue("Nathan Brown");


  });

  it('can add a friend', () => {
    const {container, getByRole, getByText, getByDisplayValue, getAllByRole} = render(<Application />)
    console.log(prettyDom(container));//shows entire tree
    const input = getByRole("textbox");
    fireEvent.change(input, {target: {value: "Nathan Brown"}});
    getByDisplayValue("Nathan Brown");
    const buttons = getAllByRole("button")//multiple buttons so getAllByRole wouldnt work. returns an array of buttons.
    const addItemButton = getByText("Add Item");
    fireEvent.click(addItemButton);
    const items = getAllByRole("listitem");
    expect(items.length).toBe(1);
    expect(items[0]).toHaveTextContent("Nathan Brown");
 
   });

});