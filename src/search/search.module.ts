import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductModel } from '../mongo/models/product.model';
import { ServiceModel } from '../mongo/models/service.model';
import { UserModel } from '../mongo/models/user.model';

@Module({
  imports: [UserModel, ServiceModel, ProductModel],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
