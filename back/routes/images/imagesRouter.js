import express from 'express';
import { upload } from '../../utils/multerConfig.js';

const imagesRouter = express.Router()

    // formData.append("profileImage") < key값과 일치
    imagesRouter.post("/profile", upload.single('profileImage'), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "이미지 파일이 없습니다."
                });
            }
    
            // 이미지 URL 생성 - /uploads/profile 경로로 통일
            const imageUrl = `/uploads/profile/${req.file.filename}`;
            
            res.status(200).json({
                success: true,
                message: "프로필 이미지 업로드 성공",
                imageUrl: imageUrl,
                filename: req.file.filename
            });
            
        } catch (error) {
            console.error("프로필 이미지 업로드 오류:", error);
            res.status(500).json({
                success: false,
                message: "이미지 업로드 중 오류가 발생했습니다."
            });
        }
    });

export default imagesRouter;
