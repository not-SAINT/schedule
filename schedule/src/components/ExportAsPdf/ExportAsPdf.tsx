import React from 'react';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

const canonic1mmDiv: any = (
  <div
    id="myMm"
    style={{
      height: '1mm',
      width: '1mm',
    }}
  />
);

const pxToMm = (px: number) => {
  return Math.floor(px / canonic1mmDiv.offsetHeight);
};

interface IExportASPdf {
  label: string;
  orientation: 'l' | 'p' | 'landscape' | 'portrait';
  course: string;
}

const ExportASPdf = React.forwardRef(({ label, orientation, course }: IExportASPdf, ref: any) => {
  const fileName = `RSSchool_schedule_${course}_${new Date().toLocaleDateString()}`;

  const onClick = () => {
    const input = ref.current;
    const inputHeightMm = pxToMm(input.offsetHeight);

    const a4WidthMm = orientation === 'p' || orientation === 'portrait' ? 210 : 300;
    const a4HeightMm = 297;
    const indent = 16;

    html2canvas(input).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');

      // Document of a4WidthMm wide and inputHeightMm high
      if (inputHeightMm > a4HeightMm) {
        // elongated a4 (system print dialog will handle page breaks)
        const pdf = new JsPDF(orientation, 'mm', [inputHeightMm + indent, a4WidthMm]);
        pdf.addImage(imgData, 'PNG', 5, 5, a4WidthMm, 0);
        pdf.save(`${label}.pdf`);
      } else {
        // standard a4
        const pdf = new JsPDF(orientation);
        pdf.addImage(imgData, 'PNG', 5, 5, a4WidthMm, 0);
        pdf.save(`${fileName}.pdf`);
      }
    });
  };

  return (
    <div className="tc mb4 mt2">
      <Button shape="circle" icon={<PrinterOutlined />} onClick={onClick} />
    </div>
  );
});

export default ExportASPdf;
