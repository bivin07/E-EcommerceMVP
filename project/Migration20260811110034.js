"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260811110034 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260811110034 extends migrations_1.Migration {
    async up() {
        this.addSql(`alter table if exists "referral_code" drop constraint if exists "referral_code_code_unique";`);
        this.addSql(`create table if not exists "referral_code" ("id" text not null, "code" text not null, "is_active" boolean not null default true, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "referral_code_pkey" primary key ("id"));`);
        this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_referral_code_code_unique" ON "referral_code" ("code") WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_referral_code_deleted_at" ON "referral_code" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "referral_code" cascade;`);
    }
}
exports.Migration20260811110034 = Migration20260811110034;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjA4MTExMTAwMzQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yZWZlcnJhbC9taWdyYXRpb25zL01pZ3JhdGlvbjIwMjYwODExMTEwMDM0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFxRTtBQUVyRSxNQUFhLHVCQUF3QixTQUFRLHNCQUFTO0lBRTNDLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyw4RkFBOEYsQ0FBQyxDQUFDO1FBQzVHLElBQUksQ0FBQyxNQUFNLENBQUMsd1RBQXdULENBQUMsQ0FBQztRQUN0VSxJQUFJLENBQUMsTUFBTSxDQUFDLHlIQUF5SCxDQUFDLENBQUM7UUFDdkksSUFBSSxDQUFDLE1BQU0sQ0FBQyx1SEFBdUgsQ0FBQyxDQUFDO0lBQ3ZJLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUVGO0FBYkQsMERBYUMifQ==