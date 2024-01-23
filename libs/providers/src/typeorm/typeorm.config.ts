import { DataSource, DataSourceOptions } from "typeorm";
import {config} from 'dotenv'
import { join } from "path";
import { ConfigService } from "@nestjs/config";


config({path:join(process.cwd(), '.env')})
const configService = new ConfigService


const options = ():DataSourceOptions =>{
    const url = configService.get('DATABASE_URL')
    if(!url){
        throw new Error('Database URL is missing')
    }
    return {
        url,
        type: 'postgres',
        schema: 'public',
        logging: configService.get('IS_PROD') === 'false',
        entities: [join(process.cwd(), 'dist', 'libs', 'entities', '**', '*.entity.{ts,js}')],
        migrations: [join(process.cwd(), 'migrations' , '**' , '*migration.*{.ts,.js}')],  // путь до корня, папка migrations , все подпапки если они есть , любые файлы в названии которых есть migration.ts
        migrationsRun: true, //при запуске проекта будут проверяться миграции
        migrationsTableName: 'migrations'
    }
}

export const appDataSource = new DataSource(options())  