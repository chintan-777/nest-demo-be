import { AuthCredentials } from './dto/auth-credential.dto';
import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  ValidationPipe,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/user/interface/user.interface';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  signUp(@Body(new ValidationPipe()) body: CreateAuthDto): Promise<User> {
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async signIn(
    @Body(new ValidationPipe()) body: AuthCredentials,
    @Res() res: Response,
  ) {
    const user = await this.authService.signIn(body);
    const token = await this.authService.createToken(user);
    const { password, ...data } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send(token);
    // return data;
  }

  @Get('user')
  @ApiOkResponse({ description: 'User found' })
  @ApiUnauthorizedResponse({ description: 'Not Authorized' })
  async getUser(@Req() req: Request) {
    try {
      const token = req.cookies['access_token'];
      const d = await this.jwtService.verifyAsync(token);
      console.log('first', d);
      if (!d) {
        throw new UnauthorizedException();
      }

      const user = await this.authService.getUser(d.email);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @ApiOkResponse({ description: 'User logged out' })
  @ApiBadRequestResponse({ description: 'User is not looged in' })
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await req.cookies['access_token'];
    if (token) {
      response.clearCookie('access_token');
      return {
        message: 'Logged out successfully',
      };
    } else {
      throw new BadRequestException('User is already logged out');
    }
  }
}
