import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";

/**
 * This function retrieves the current user's information and renders a user information component.
 * It uses the Clerk SDK to fetch the user's details and renders different UI based on whether the user is signed in or not.
 *
 * @returns {JSX.Element} - A React component that displays the user's information and sign-in/sign-out buttons.
 */
async function UserInformation() {
  // Fetch the current user using the Clerk SDK
  const user = await currentUser();

  // Extract the user's first name and last name
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  // Render the user information component
  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <Avatar>
        {/* Render the user's avatar image if available, otherwise use a fallback */}
        {user?.id ? (
          <AvatarImage src={user?.imageUrl} />
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" />
        )}
        <AvatarFallback>
          {/* Render the initials of the user's name if the avatar image is not available */}
          {firstName?.charAt(0)}
          {lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      {/* Render the user's information if signed in */}
      <SignedIn>
        <div className="text-center">
          <p className="font-semibold">
            {firstName} {lastName}
          </p>

          <p className="text-xs">
            @{firstName}
            {lastName}-{user?.id?.slice(-4)}
          </p>
        </div>
      </SignedIn>

      {/* Render a sign-in button if the user is not signed in */}
      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold">You are not signed in</p>

          <Button asChild className="bg-[#0B63c4] text-white">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </SignedOut>

      <hr className="w-full border-gray-200 my-5" />

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Posts</p>
        {/* <p className=" text-blue-400">{userPosts?.length}</p> */}
        <p className=" text-blue-400">0</p>
      </div>

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Comments</p>
        {/* <p className=" text-blue-400">{userComments?.length}</p> */}
        <p className=" text-blue-400">0</p>
      </div>
    </div>
  );
}

export default UserInformation;
