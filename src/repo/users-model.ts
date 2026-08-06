import { DataTypes, Model } from 'sequelize';
import { db } from '../index'

export class UserDb extends Model { }

UserDb.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'last_name'
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        otp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        userType: {
            type: DataTypes.ENUM('admin', 'seller', 'buyer'),
            allowNull: false

        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            field: 'updated_at'
        }
    },
    {
        sequelize: db,
        tableName: 'users'
    }
);
