import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, RotateCcw } from 'lucide-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageCropperProps {
  image: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

export default function ImageCropper({ image, onCrop, onCancel }: ImageCropperProps) {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [cropData, setCropData] = useState('');

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      setCropData(croppedCanvas.toDataURL());
      onCrop(croppedCanvas.toDataURL());
    }
  };

  const rotateCropper = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      cropperRef.current.cropper.rotate(90);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Crop Profile Picture
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: '100%' }}
              zoomTo={0.5}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={rotateCropper}
              className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Rotate
            </button>

            <div className="flex space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={getCropData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Check className="h-4 w-4 mr-2" />
                Apply
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}