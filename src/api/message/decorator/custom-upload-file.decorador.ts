import {
  BadRequestException,
  ExecutionContext,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
  createParamDecorator,
} from '@nestjs/common';


export const CustomUploadFile = (
  maxSizeMb: number,
  fileType: string | RegExp,
) =>
  createParamDecorator(
    (_: any, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      const files = req.files;

      if (files.length > 1)
        throw new BadRequestException('Only attach one file');

      return files[0];
    },
    [
      UploadedFiles(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: maxSizeMb * 1e6 }),
            new FileTypeValidator({ fileType: fileType }),
          ],
        }),
      ),
    ],
  )();
