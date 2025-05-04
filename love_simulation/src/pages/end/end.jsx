import TitleButton from "./components/title_button";
import ResultProp from "../../types/result_prop";
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { TwitterShareButton, XIcon } from 'react-share';


const End = (result) => {

  // result must be ResultProp type
  // if (!(result instanceof ResultProp)) {
  //   throw new Error("Invalid result prop type. Expected ResultProp.");
  // }

  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const captureAndUpload = async () => {
      try {
        // 1. キャプチャ
        const canvas = await html2canvas(document.body);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        // 2. Imgur にアップロード（例）
        const form = new FormData();
        form.append('image', blob);
        const res = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: { Authorization: 'Client-ID YOUR_IMGUR_CLIENT_ID' },
          body: form,
        });
        const json = await res.json();
        if (json.success) {
          setImgUrl(json.data.link);
        } else {
          console.error('アップロード失敗', json);
        }
      } catch (error) {
        console.error('キャプチャまたはアップロード中にエラー', error);
      }
    };

    captureAndUpload();
  }, []);


  return (
    <div className="end">
      <h1>End</h1>
      <p>Thank you for playing!</p>
      {/* <p>Final point:{result.points}</p> */}
      <p>We hope you enjoyed the game!</p>
      <TitleButton />
      <div>
        {imgUrl ? (
          <div>
            <TwitterShareButton url={imgUrl} title="このスクリーンショットをシェアします">
              <XIcon size={32} round />
              <span style={{ marginLeft: 8 }}>X でシェア</span>
            </TwitterShareButton>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default End;