import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './logger/logger.service';
import * as config from 'config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService(),
    bodyParser: false,
  });
  app.use(bodyParser.json({limit: '1000mb'}));
  app.use(bodyParser.urlencoded({limit: '1000mb', extended: true}));
  await app.listen(process.env.PORT || serverConfig.port);
}

bootstrap();
