import { currentUser } from '@clerk/nextjs/server'

export default async function AccountPage() {
  const user = await currentUser()

  if (!user) return <div>Please log in to view your orders.</div>

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32">
      <h1 className="text-3xl font-light uppercase mb-8">Your Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-lg font-medium border-b pb-2 mb-4">Profile Details</h2>
          <p className="text-gray-600">Name: {user.fullName}</p>
          <p className="text-gray-600">Email: {user.emailAddresses[0].emailAddress}</p>
        </section>

        <section>
          <h2 className="text-lg font-medium border-b pb-2 mb-4">Recent Orders</h2>
          {/* This is where you would map through your DB orders using user.id */}
          <p className="text-sm text-gray-400">No orders found yet.</p>
        </section>
      </div>
    </div>
  )
}