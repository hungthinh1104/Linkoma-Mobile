// index.js
import { registerRootComponent } from 'expo';
import App from './src/App'; // ✅ CHÍNH XÁC vì App nằm trong src/

registerRootComponent(App);
// ✅ CHÍNH XÁC vì registerRootComponent là hàm từ expo để đăng ký ứng dụng chính