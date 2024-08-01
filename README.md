การติดตั้งโปรแกรมนี้
1. cd ไปยังโฟล์เดอร์ ~/angular-simpleConnect
2. ทำการรันคำสั่ง npm install --legacy-peer-deps
3. หากขาดตัวใด ให้ทำการ npm install -g ตัวนั้น ๆ
4. เมื่อทำการ install จนครบแล้วนั้น ให้รันคำสั่ง ตามลำดับดังนี้
   rm -rf node_modules
  rm -rf dist
  npm install --legacy-peer-deps
5. ทำการรันคำสั่ง ng -g environments
6. แก้ไขไฟล์ environment.developments.ts ดังนี้
   export const environment = {
    production: false,
    localApiUrl: 'http://ip_addr_api_server/api'
  };
7. แก้ไขไฟล์ environment.ts ดังนี้
   export const environment = {
    production: false,
    apiUrl: 'http://ip_addr_api_server:3000' 
};
8. แก้ไข ip address ในไฟล์ ~/services/local-model-service.ts ให้เป็น ip address ของที่อยู่หน้าเวป
9. รันคำสั่ง ng serve
    -กรณีมีปัญหา Delta ให้ทำการ enter มาอยู่บรรทัดใหม่ ดังนี้
      ![image](https://github.com/user-attachments/assets/17e3dff1-8173-4ef4-b720-a52df3d839d7)

10. ไปยัง ~/jstolocal
11. ทำการรันคำสั่ง npm install --legacy-peer-deps
12. รันคำสั่ง node server.js
13. ใช้งาน Leng's_AI ผ่านทางหน้าเวป

