import ProfileUserStore from "@/components/store/account/profile";

const user = {
    email: "email@gmail.com",
    id: 0,
    urlAvatar: "",
    userId: "123",
    username: "user",
    phone: "0123456789",
    firstName: "first",
    lastName: "last",
    password: "password",
    address: "address",
    gender: false,
};

const Page: React.FC = () => {
    return (
        <ProfileUserStore user={user}/>
    );
};

export default Page;
