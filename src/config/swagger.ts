import { DocumentBuilder } from '@nestjs/swagger';

export default new DocumentBuilder()
  .setTitle('Assignment')
  .setDescription('Assignment API description')
  // .setVersion('1.0')
  .addBearerAuth()
  .build();
