import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({ src }: { src: string }) {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback className="font-sans bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
        <span className="material-symbols-sharp">person</span>
      </AvatarFallback>
    </Avatar>
  );
}
