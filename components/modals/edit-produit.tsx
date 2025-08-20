import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePenLine } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function EditeProduit({ id }: { id: string }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <FilePenLine />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] md:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
              {id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Clavier HP" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="#fofana" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Descrption</Label>
              <Textarea id="username-1" name="descr" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Prix</Label>
              <Input
                id="username-1"
                name="username"
                type="number"
                defaultValue="15000"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Shop</Label>
              <Input
                id="username-1"
                name="username"
                defaultValue="Ma boutique"
                disabled
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
