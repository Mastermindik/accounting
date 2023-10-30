import Image from "next/image";
import styles from "./UserPhoto.module.scss";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button, Fab } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { useUpdateUserPhotoMutation } from "@/app/store/api/user.endpoint";
import { UseActions } from "@/app/hooks/UseActions";

type UserPhotoProps = {
  url: string | null,
}

export default function UserPhoto({ url }: UserPhotoProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [img, setImg] = useState<File>();
  const [update, updateResult] = useUpdateUserPhotoMutation();

  // useEffect(() => {
  // }, [updateResult])
  

  const handleSelect = () => {
    document.getElementById("avatar")?.click();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.item(0);

    if (image) {
      setImgUrl(URL.createObjectURL(image));
      setImg(image);
    }
  }

  const handleClick = () => {
    const avatar = new FormData();
    avatar.append("file", img ? img : "");
    update(avatar);
  }

  return (
    <div className={styles.user_photo}>
      <div className={styles.photo}>
        {url ?
          <Image className={styles.icon} src={url} width={40} height={40} alt="avatar" /> :
          <AccountBoxIcon className={styles.icon} />}
      </div>
      <input type="file" name="avatar" id="avatar" accept="image/*" onChange={(e) => handleChange(e)} />
      <div className={styles.btn_group}>
        <Button
          variant="contained"
          color="secondary"
          className={styles.select_input_btn}
          onClick={handleSelect}>update photo</Button>
        {imgUrl ?
          <Fab
            color="success"
            className={styles.save_changes_btn}
            data-aos="fade-right"
            onClick={handleClick} >
            <SaveIcon />
          </Fab> : ""}
      </div>
      {imgUrl.length ?
        <div className={styles.previewPhoto} data-aos="fade-down">
          <Image className={styles.new_icon} src={imgUrl} width={40} height={40} alt="New avatar" />
        </div> : ""}
    </div>
  )
}
