import { Controller, HttpCode, UsePipes, Post, Body } from '@nestjs/common';

import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';

const createPostBodySchema = z.object({
	field1: z.string(),
	field2: z.string(),
	field3: z.string(),
});

type CreatePostBodySchema = z.infer<typeof createPostBodySchema>;

@Controller()
export class CreateUserController {
	constructor(
		private readonly prismaService: PrismaService,
	) {}

	@Post('/post')
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createPostBodySchema))
	create(@Body() body: CreatePostBodySchema) {
		const { field1, field2, field3 } = body;

		return { field1, field2, field3 };
	}
}
