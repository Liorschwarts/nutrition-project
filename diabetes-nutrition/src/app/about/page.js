export const metadata = {
  title: "About | Diabetes Carb Calculator",
  description:
    "Learn about our mission to help people with Type 1 Diabetes manage their carbohydrate intake",
};

export default function About() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">About Our Calculator</h1>
        <p className="text-gray-600">
          The Diabetes Carb Calculator was created to help people with Type 1
          Diabetes accurately calculate their insulin doses based on the
          carbohydrate content of their food.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-600">
          Our mission is to make diabetes management easier by providing simple
          yet powerful tools for accurate carbohydrate counting and insulin dose
          calculation. We believe that better tools lead to better glucose
          control and ultimately a better quality of life for people with
          diabetes.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-600 mb-4">
          The calculator uses your personal insulin-to-carbohydrate ratio (ICR)
          to determine how much insulin is needed for the carbohydrates in your
          meal. The ICR is the number of grams of carbohydrate covered by one
          unit of insulin.
        </p>
        <p className="text-gray-600">
          For example, if your ICR is 1:10, then one unit of insulin will cover
          10 grams of carbohydrates. If you eat a meal containing 50 grams of
          carbs, the calculator will recommend 5 units of insulin.
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold mb-3">Advanced Features</h2>
        <p className="text-gray-600 mb-4">
          Beyond basic carb counting, our calculator includes:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Blood glucose correction calculations</li>
          <li>Comprehensive food database with carb content</li>
          <li>Glycemic index information</li>
          <li>Custom food entry</li>
          <li>Serving size adjustments</li>
        </ul>
        <p className="text-gray-600 mt-4">
          Future updates will include image recognition for automatic
          carbohydrate detection in food photos.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Medical Disclaimer</h2>
        <p className="text-gray-600 mb-4">
          This application is designed as a tool to assist with diabetes
          management but is not a substitute for professional medical advice,
          diagnosis, or treatment.
        </p>
        <p className="text-gray-600 font-medium">
          Always consult with your healthcare provider before making changes to
          your diabetes management plan. Your ICR, correction factor, and target
          glucose levels should be determined by your healthcare team.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p className="text-gray-600">
          We're always looking to improve our calculator. If you have questions,
          feedback, or suggestions, please don't hesitate to reach out to us at{" "}
          <a
            href="mailto:contact@diabetescarbcalculator.com"
            className="text-blue-600 hover:underline"
          >
            contact@diabetescarbcalculator.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
