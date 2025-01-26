import { defineType, defineField } from 'sanity';

export default defineType({
  title: "Order",
  name: "order",
  type: "document",
  fields: [
    defineField({
      title: "Order ID",
      name: "orderId",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "User  Details",
      name: "userDetails",
      type: "object",
      fields: [
        defineField({
          title: "First Name",
          name: "firstName",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Last Name",
          name: "lastName",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Email",
          name: "email",
          type: "string",
          validation: (Rule) => Rule.required().email(),
        }),
        defineField({
          title: "Phone",
          name: "phone",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        // Add more fields as necessary
      ],
    }),
    defineField({
      title: "Items",
      name: "items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.required().min(1), // Ensure at least one item is present
    }),
    defineField({
      title: "Total Amount",
      name: "totalAmount",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Order Status",
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});