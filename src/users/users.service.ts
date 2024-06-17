import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
import { UserDto } from 'src/DTO/users.dto';
import { User, UserDocument } from 'src/models/users.models';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

    Add(body:UserDto) {
        return this.UserModel.create(body);
    }
    FindAll() {
        return this.UserModel.find();
    }
    FindOne(id:string)  {
        return this.UserModel.findById(id) ;
    }
    Update(id:string,body:UserDto) {
        return this.UserModel.findByIdAndUpdate(
            {_id :id,},
            {$set :body},
            {new :true}
        );
    }

    Delete(id: string) {
        return this.UserModel.deleteOne({_id:id});
      }
    Search(key:string) {
        const keyword = key
      ? {
          $or: [
            { fullname: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.UserModel.find(keyword);
  }

    
}
