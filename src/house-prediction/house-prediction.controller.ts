import { Controller, Post, Body } from '@nestjs/common';
import { PythonShell } from 'python-shell';

@Controller('house-prediction')
export class HousePredictionController {
  @Post()
  async predictPrice(@Body() inputData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const shell = new PythonShell('predict.py', { args: [JSON.stringify(inputData)] });

      let output = '';
      shell.on('message', (message) => {
        output += message; // Thu thập kết quả từ Python
      });

      shell.on('error', (err) => {
        console.error('Error running Python script:', err);
        reject(err); // Trả về lỗi nếu có
      });

      shell.on('close', () => {
        console.log('Python script result:', output);
        resolve(output); // Trả về kết quả từ Python
      });
    });
  }
}
