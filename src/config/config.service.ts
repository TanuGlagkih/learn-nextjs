import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvConfigOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отстутсвует');
		} else {
			this.logger.log('[ConfigService] Конфигурация .env загружена');
			this.config = result.parsed as DotenvConfigOutput;
		}
	}

	get(key: string): string {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-expect-error
		return this.config[key];
	}
}
