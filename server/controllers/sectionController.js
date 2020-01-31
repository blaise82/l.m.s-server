import uuid from 'uuid/v1';
import { Section } from '../db/models';

class SectionController {
  static async addSection(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to perform this action',
      });
    }
    const { sectionName } = req.body;
    try {
      const foundSection = await Section.findOne({
        where: {
          sectionName: sectionName.toUpperCase().trim(),
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
        sectionName: sectionName.toUpperCase().trim(),
      });
      return res.status(201).json({
        status: 201,
        message: 'Section added successfully',
        data: {
          sectionId: newSection.sectionId,
          sectionName: newSection.sectionName,
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

  static async deleteSection(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to perform this action',
      });
    }
    try {
      const { section } = req.params;
      const sectionInDb = await Section.findOne({
        where: {
          sectionName: section.toUpperCase(),
        },
      });
      if (!sectionInDb) {
        return res.status(404).send({
          status: 404,
          message: 'section not found',
        });
      }
      await Section.destroy({
        where: {
          sectionName: sectionInDb.sectionName,
        },
      });
      return res.status(200).json({
        status: 200,
        message: 'section deleted successfully',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'server error',
      });
    }
  }

  static async editSection(req, res) {
    try {
      const { sectionId } = req.params;
      const { sectionName } = req.body;

      if (req.user.isAdmin !== true) {
        return res.status(401).json({
          status: 401,
          error: 'You are not allowed to perform this action',
        });
      }

      const foundSection = await Section.findOne({
        where: {
          sectionId,
        },
      });

      if (!foundSection) {
        return res.status(404).json({
          status: 404,
          error: 'Section not found',
        });
      }

      await Section.update(
        { sectionName },
        { where: { sectionId } },
      );
      return res.status(200).json({
        status: 200,
        message: 'Section edited successfully',
        data: {
          sectionId,
          sectionName,
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

  static async getSections(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to perform this action',
      });
    }
    const getAll = await Section.findAll();
    return res.status(200).json({
      status: 200,
      message: 'All Sections ',
      data: { getAll },
    });
  }
}
export default SectionController;
