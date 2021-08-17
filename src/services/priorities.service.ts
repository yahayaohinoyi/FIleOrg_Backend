import { CreatePriorityDto } from './../dtos/priorities.dto';
import { PriorityEntity } from '@/entity/priorities.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { getRepository } from 'typeorm';
class PriorityService {
  public priorities = PriorityEntity;

  public async findPriorities(): Promise<PriorityEntity[]> {
    const priorityRepository = getRepository(this.priorities);
    const priorities: PriorityEntity[] = await priorityRepository.find();
    return priorities;
  }

  public async findPriorityById(priorityId: number): Promise<PriorityEntity> {
    if (isEmpty(priorityId)) throw new HttpException(400, "priority doesn't exist");

    const priorityRepository = getRepository(this.priorities);
    const findPriority: PriorityEntity = await priorityRepository.findOne({ where: { id: priorityId } });
    if (!findPriority) throw new HttpException(409, 'Cannot find priority');

    return findPriority;
  }

  public async createPriority(priorityData: CreatePriorityDto): Promise<PriorityEntity> {
    if (isEmpty(priorityData)) throw new HttpException(400, "You're not userData");

    const priorityRepository = getRepository(this.priorities);
    const findPriority: PriorityEntity = await priorityRepository.findOne({ where: { id: priorityData.id } });
    if (findPriority) throw new HttpException(409, `Priority ${priorityData.name} already exists`);

    const priority = new PriorityEntity();
    priority.name = priorityData.name;

    const createPriorityData: PriorityEntity = await priorityRepository.save(priority);

    return createPriorityData;
  }

  public async updatePriority(priorityId: number, priorityData: any): Promise<PriorityEntity> {
    if (isEmpty(priorityData)) throw new HttpException(400, 'No data found');

    const priorityRepository = getRepository(this.priorities);
    const findPriority: PriorityEntity = await priorityRepository.findOne({ where: { id: priorityId } });
    if (!findPriority) throw new HttpException(409, 'Cannot find Priority');

    await priorityRepository.update(priorityId, { ...priorityData });

    const updatePriority: PriorityEntity = await priorityRepository.findOne({ where: { id: priorityId } });
    return updatePriority;
  }

  public async deletePriority(priorityId: number): Promise<PriorityEntity> {
    if (isEmpty(priorityId)) throw new HttpException(400, 'priority ID required');

    const priorityRepository = getRepository(this.priorities);
    const findPriority: PriorityEntity = await priorityRepository.findOne({ where: { id: priorityId } });
    if (!findPriority) throw new HttpException(409, "You're not user");

    await priorityRepository.delete({ id: priorityId });
    return findPriority;
  }
}

export default PriorityService;
