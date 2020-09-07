import React from 'react';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { Button } from 'antd';

const canonic1mmDiv: any = <div id="myMm" style={{ height: '1mm' }} />;

const pxToMm = (px: number) => {
  return Math.floor(px / canonic1mmDiv.offsetHeight);
};

const ExportASPdf = React.forwardRef(
  ({ label, orientation }: { label: string; orientation: 'p' | 'l' | 'portrait' | 'landscape' }, ref: any) => {
    const onClick = () => {
      const input = ref.current;
      const inputHeightMm = pxToMm(input.offsetHeight);
      const a4WidthMm = 210;
      const a4HeightMm = 297;

      html2canvas(input).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');

        // Document of a4WidthMm wide and inputHeightMm high
        if (inputHeightMm > a4HeightMm) {
          // elongated a4 (system print dialog will handle page breaks)
          const pdf = new JsPDF(orientation, 'mm', [inputHeightMm + 16, a4WidthMm]);
          pdf.addImage(imgData, 'PNG', 5, 5, 0, 0);
          pdf.save(`${label}.pdf`);
        } else {
          // standard a4
          const pdf = new JsPDF(orientation);
          pdf.addImage(imgData, 'PNG', 5, 5, 0, 0);
          pdf.save(`${label}.pdf`);
        }
      });
    };

    return (
      <div className="tc mb4 mt2">
        <Button type="dashed" className="Button" onClick={onClick}>
          {label}
        </Button>
      </div>
    );
  },
);

export default ExportASPdf;
