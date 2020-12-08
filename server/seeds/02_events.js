
exports.seed = function (knex) {

  return knex('Events').insert([
    {
      name: "Riding", address: "Around", description: "You can now view client in the browser."
    },
    { name: "Drive in the park", address: "Sea to sky Hwy", description: "Compiled successfully! You can now view client in the browser." },
    { name: "Snowboarding", address: "Mt Seymour", description: "Note that the development build is not optimized. To create a production build, use npm run build." },
    { name: "Running", address: "Stanley Park", description: " server/node_modules/knex/lib/runnerds:277:24" },
  ]);
}
