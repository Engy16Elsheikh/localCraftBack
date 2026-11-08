import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { OrderModel } from '../mongo/models/order.model';
import { ServiceModel } from '../mongo/models/service.model';
import { ProductModel } from '../mongo/models/product.model';
import { FeedbackModel } from '../mongo/models/feedback.model';

@Module({
  imports: [OrderModel, ServiceModel, ProductModel, FeedbackModel],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
