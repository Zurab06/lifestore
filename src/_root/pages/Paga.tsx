export const TodoList = ({ visibility, themeColor }) => { 
     const [todos, setTodos] = useState(initialTodos); 
     const handleChange = (todo) => setTodos ((todos) => getUpdated (todos, todo));
      const filtered = getFiltered (todos, visibility); return (
        
         <div> <ul> {filtered.map((todo) => ( <Todo key={todo.id) todo={todo} onChange={handleChange} /> ))} </ul> <AddTodo setTodos={setTodos) themeColor={themeColor} /> </div> ни visibility.  ); };