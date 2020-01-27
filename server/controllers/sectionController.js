import uuid from 'uuid/v1';
import { Section } from '../db/models';

class SectionController {
  static async addSection(req, res) {
    const { sectionName } = req.body;
    try {
      const foundSection = await Section.findOne({
        where: {
          sectionName: sectionName.trim(),
        },
      });
      if (foundSection) {
        return res.status(409).json({
          status: 409,
          message: 'Section already exists',
        });
      }
      const newSection = await Section.create({
        sectionId: uuid(),
        sectionName: sectionName.trim(),
      });
      return res.status(201).json({
        status: 201,
        message: 'Section added successfully',
        data: {
          sectionId: newSection.sectionId,
          sectionName: newSection.sectionName
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'server error',
        data: err.message,
      });
    }
  }
}
export default SectionController;
