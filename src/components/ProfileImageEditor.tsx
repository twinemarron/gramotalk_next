"use client";
import { useState, useRef, useMemo } from "react";
import { useFormStatus } from "react-dom";
import Cropper, { Area } from "react-easy-crop";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import UserAvatar from "@/components/UserAvatar";
import { Session } from "next-auth";
import { uploadFile } from "@/app/actions";
import getCroppedImg from "@/lib/cropImage";
import { useToast } from "@/components/ui/use-toast";
import { FormButton } from "@/components/FormButton";

const DEFAULT_CROP = { x: 0, y: 0 };

export default function ProfileImageEditor({
  session,
}: {
  session: Session | null;
}) {
  const { pending } = useFormStatus();
  const { update } = useSession();
  const { toast } = useToast();
  const [crop, setCrop] = useState(DEFAULT_CROP);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [image, setImage] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const resetStates = () => {
    setCrop(DEFAULT_CROP);
    setZoom(1);
    setRotation(0);
    setImage(undefined);
    fileInputRef.current!.value = "";
  };

  // ファイルを選択したときの動作
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  };

  const fileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const objectUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : ""),
    [image]
  );

  return (
    <>
      <div className="flex items-center justify-center gap-4 py-8">
        <UserAvatar
          src={session?.user?.image || ""}
          avatarStyle={{ width: "120px", height: "120px" }}
        />
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onInput={handleInput}
        />
        <Button variant="outline" onClick={fileUpload}>
          Change image
        </Button>
      </div>
      <Dialog
        open={!!image}
        onOpenChange={(open: boolean) => {
          if (open) return;
          resetStates();
        }}
      >
        {
          // <DialogTrigger asChild>
          //   <Button variant="outline">Change image</Button>
          // </DialogTrigger>
        }
        <DialogContent className="sm:max-w-[425px]">
          <form
            action={async (formData) => {
              try {
                if (!croppedAreaPixels) return;
                const croppedImage = await getCroppedImg(
                  objectUrl,
                  croppedAreaPixels,
                  rotation
                );
                if (!croppedImage) return;
                const formData = new FormData();
                formData.append("file", croppedImage);
                await uploadFile(formData);
                await update();
                toast({
                  description: "プロフィール画像を変更しました。",
                });
              } catch (error) {
                console.error("Error in uploadFile:", error);
                toast({
                  description: "プロフィール画像変更に失敗しました。",
                  variant: "destructive",
                });
              } finally {
                resetStates();
              }
            }}
            className="flex flex-col gap-2"
          >
            <DialogHeader>
              <DialogTitle>Change image</DialogTitle>
              <DialogDescription>画像を調整してください。</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <div className="relative aspect-square">
                <Cropper
                  image={objectUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={(crop) => {
                    setCrop(crop);
                  }}
                  onZoomChange={(zoom) => {
                    setZoom(zoom);
                  }}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div className="py-6">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  disabled={pending}
                  onChange={(e) => {
                    setZoom(Number(e.target.value));
                  }}
                  className="w-full h-[2px] accent-slate-500"
                />
              </div>
            </div>
            <DialogFooter>
              <div className="flex flex-col gap-3">
                <FormButton
                  label="Cancel"
                  variant="outline"
                  type="button"
                  onClick={resetStates}
                />
                <FormButton type="submit" label="Save" />
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
