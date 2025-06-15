
import React, { useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Image, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ChartUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ChartUpload: React.FC<ChartUploadProps> = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Fehler",
        description: "Bitte laden Sie nur Bilddateien hoch.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "Fehler",
        description: "Datei zu groß. Maximum 10MB erlaubt.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      onImageUpload(result);
      toast({
        title: "Erfolgreich",
        description: "Chart-Bild wurde hochgeladen.",
      });
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const removeImage = () => {
    setUploadedImage(null);
    onImageUpload('');
  };

  if (uploadedImage) {
    return (
      <div className="relative">
        <img 
          src={uploadedImage} 
          alt="Uploaded chart" 
          className="w-full h-64 object-contain bg-stravesta-darkGray rounded-lg"
        />
        <button
          onClick={removeImage}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <Card 
      className={`border-2 border-dashed transition-all duration-200 cursor-pointer shadow-none ${
        isDragOver 
          ? 'border-stravesta-teal bg-stravesta-teal/10' 
          : 'border-stravesta-teal/20 bg-stravesta-navy/70 hover:border-stravesta-teal/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4">
          <Upload className={`h-12 w-12 ${isDragOver ? 'text-stravesta-teal' : 'text-stravesta-lightGray'}`} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Chart-Bild hochladen
        </h3>
        <p className="text-stravesta-lightGray mb-4">
          Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="chart-upload"
        />
        <label
          htmlFor="chart-upload"
          className="bg-stravesta-teal hover:bg-stravesta-teal/90 text-stravesta-dark px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2 font-semibold"
        >
          <Image className="h-4 w-4" />
          Datei auswählen
        </label>
        <p className="text-xs text-stravesta-lightGray mt-2">
          PNG, JPG, JPEG bis 10MB
        </p>
      </CardContent>
    </Card>
  );
};

export default ChartUpload;

