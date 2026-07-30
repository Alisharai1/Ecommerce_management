import { DataTypes, Model } from 'sequelize';
import { db } from './db'

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
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
