import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addUser } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchUser } from "../../store/slices/userSlice";
import * as React from "react";
import { PlusIcon } from "lucide-react";
import { useAppDispatch } from "@/store";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type UserState = {
  users: string[];
  loading: boolean;
  error: string | null;
};

type RootState = {
  user: UserState;
};

const Task3 = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user,
  );
  const [name, setName] = useState("");
  const avatar = "https://github.com/shadcn.png";
  useEffect(() => {
    toast.promise(dispatch(fetchUser()), {
      loading: "Loading...",
      success: "Users loaded.",
      error: "Failed to load users.",
    });
  }, [dispatch]);

  const handlePost = () => {
    if (name) {
      dispatch(addUser(name));
      setName("");
      toast.success(`New User Added.`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <>
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="w-full max-w-xs">
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user"
              />
            </Field>
            <Field orientation="horizontal">
              <Button onClick={handlePost}>Create User</Button>
            </Field>
          </FieldGroup>
          <br />
          <br />
          <ItemGroup className="max-w-sm">
            <h2>Users</h2>
            {users.map((person, index) => (
              <Item key={index} variant="outline">
                <ItemMedia>
                  <Avatar>
                    <AvatarImage src={avatar} className="grayscale" />
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-1">
                  <ItemTitle>{person}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <PlusIcon />
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </div>
    </>
  );
};

export default Task3;

// import { Button } from "@/components/ui/button";
// import { addUser, deleteUser, clearUser } from "@/store/slices/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import data from "./data.json?url";
// // const API_URL = "https://www.jsonkeeper.com/b/OMZAZ";

// const Task3 = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.user.users);
//   //
//   const [userList, setUserList] = useState([]);
//   const [name, setName] = useState("");

//   useEffect(() => {
//     fetch(data)
//       .then((responce) => responce.json())
//       .then((data) => setUserList(data))
//       .catch((error) => console.log(error));
//   }, []);

//   const handlePost = () => {
//     if (name) {
//       const newUser = name;
//       dispatch(addUser(name));
//       setUserList((prev) => [...prev, newUser]);
//       setName("");
//     }
//   };

//   // const handlePost = () => {
//   //   if (name) {
//   //     const newUser = name;
//   //     fetch(API_URL, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(newUser),
//   //     })
//   //       .then((res) => res.json())
//   //       .then((savedData) => setUserList([...userList, savedData]));
//   //   }
//   //   // setUserList((prev) => [...prev, newUser]);
//   // };
//   return (
//     <>
//       <div>
//         <h1>Hello</h1>
//         <Button onClick={handlePost}>Add</Button>
//         {/* <Button onClick={() => dispatch(deleteUser())}>Pop</Button>
//         <Button onClick={() => dispatch(clearUser())}>Clear</Button> */}
//         <br />
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter user"
//         />
//         {users.map((user, index) => (
//           <li key={index}>{user}</li>
//         ))}

//         <p>-----------</p>
//         {/* <Button onClick={handlePost}>Add</Button>

//         {userList.map((data) => (
//           <li>{data.name}</li>
//         ))}
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter user"
//         /> */}
//       </div>
//     </>
//   );
// };

// export default Task3;
