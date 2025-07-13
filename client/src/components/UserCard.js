function UserCard({ user }) {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-xl">{user.name}</h3>
      <p>{user.email}</p>
      <p className="text-sm text-gray-600">Role: {user.role}</p>
    </div>
  );
}

export default UserCard;
