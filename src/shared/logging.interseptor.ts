import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//this class catches all requests --------------------------------------
@Injectable()
export class LoggerInterseptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		const req = context.switchToHttp().getRequest();
		const method = req.method;
		const url = req.url;
		const now = Date.now();

		return next
			.handle()
			.pipe(
				tap(_ =>
					Logger.log(
						`${method} ${url} ${Date.now() - now}ms`,
						context.getClass().name,
					),
				),
			);
	}
}
