import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleStatus, onDelete, onEdit }) {
  return (
    <div>
      <h3>Your Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;