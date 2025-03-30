import Email from "./Users/email.svg";
import Lock from "./Users/lock.svg";
import UserHead from "./Users/user.svg";
import Briefcase from "./Users/briefcase.svg";
import Hashtag from "./Users/hashtag.svg";
import Edit from "./Users/edit.svg";
import Search from "./Users/search.svg";

export const UserIcons = {
  Email: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Email} alt="Email" width={size} height={size} className={className} />,
  Lock: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Lock} alt="Lock" width={size} height={size} className={className} />,
  UserHead: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={UserHead} alt="User" width={size} height={size} className={className} />,
  Briefcase: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Briefcase} alt="Briefcase" width={size} height={size} className={className} />,
  Hashtag: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Hashtag} alt="Hashtag" width={size} height={size} className={className} />,
  Edit: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Edit} alt="Edit" width={size} height={size} className={className} />,
  Search: ({ size = 24, className = "" }: { size?: number; className?: string }) => <img src={Search} alt="Search" width={size} height={size} className={className} />,
};



export default UserIcons;