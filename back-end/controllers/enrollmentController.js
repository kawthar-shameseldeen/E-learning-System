import Enrollment from '../models/enrollmentModel.js';
import User from '../models/userModel.js';
import Class from '../models/classModel.js';

export const createEnrollment = async (req, res) => {
  const { student, class: classId } = req.body;

  try {
    const studentExists = await User.findById(student);
    if (!studentExists) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const newEnrollment = new Enrollment({
      student,
      class: classId,
    });

    await newEnrollment.save();
    res.status(201).json({ message: 'Enrollment created successfully', enrollment: newEnrollment });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;

  try {
    const enrollment = await Enrollment.findByIdAndDelete(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('class', 'title description');
    res.status(200).json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getEnrollmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const enrollment = await Enrollment.findById(id)
      .populate('student', 'name email')
      .populate('class', 'title description');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateEnrollment = async (req, res) => {
  const { id } = req.params;
  const { student, class: classId } = req.body;

  try {
    const studentExists = await User.findById(student);
    if (!studentExists) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      id,
      { student, class: classId },
      { new: true, runValidators: true }
    );
    if (!updatedEnrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(200).json({ message: 'Enrollment updated successfully', enrollment: updatedEnrollment });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
