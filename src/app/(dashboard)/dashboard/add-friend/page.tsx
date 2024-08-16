import AddFriendForm from "@components/AddFriendForm";

export default function AddFriendPage() {
  return (
    <main className={`flex min-h-screen items-center justify-center`}>
      <div className={`space-y-16`}>
        <h1 className={`text-2xl font-extrabold sm:text-3xl md:text-4xl`}>
          Add Friend Page
        </h1>

        <AddFriendForm />
      </div>
    </main>
  );
}
