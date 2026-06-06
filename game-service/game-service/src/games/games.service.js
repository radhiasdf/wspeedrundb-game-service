"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GamesService = class GamesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.games.findMany();
    }
    async findOne(game_id) {
        const game = await this.prisma.games.findUnique({
            where: { game_id },
            include: { run_categories: true },
        });
        if (!game) {
            throw new common_1.NotFoundException(`Game with id ${game_id} not found`);
        }
        return game;
    }
    async create(dto) {
        return this.prisma.games.create({
            data: {
                game_name: dto.game_name,
                description: dto.description,
            },
        });
    }
    async update(game_id, dto) {
        await this.findOne(game_id);
        return this.prisma.games.update({
            where: { game_id },
            data: dto,
        });
    }
    async remove(game_id) {
        await this.findOne(game_id);
        await this.prisma.run_categories.deleteMany({ where: { game_id } });
        return this.prisma.games.delete({ where: { game_id } });
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamesService);
//# sourceMappingURL=games.service.js.map