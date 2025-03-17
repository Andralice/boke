// src/utils/imageUtils.ts

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  
  export function compressImage(img: HTMLImageElement, maxSizeInBytes: number): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    let width = img.width;
    let height = img.height;
  
    // 计算缩放比例
    let ratio = Math.sqrt(maxSizeInBytes / (img.width * img.height * 4));
    width = Math.floor(width * ratio);
    height = Math.floor(height * ratio);
  
    canvas.width = width;
    canvas.height = height;
  
    // 绘制缩小后的图像
    ctx?.drawImage(img, 0, 0, width, height);
  
    // 获取压缩后的 Base64 编码字符串
    const mimeType = 'image/jpeg'; // 可以根据需要选择其他格式
    const quality = 0.92; // 图片质量，可以根据需要调整
    const compressedBase64 = canvas.toDataURL(mimeType, quality);
  
    return compressedBase64;
  }
  
  
  
  