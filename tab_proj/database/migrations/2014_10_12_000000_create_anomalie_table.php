<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnomalieTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anomalie', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('element_imp');
            $table->string('description');
            $table->string('risque')->nullable();
            $table->string('score_cvss')->nullable();
            $table->float('score', 8, 1)->nullable();
            $table->string('AV')->nullable();
            $table->string('AC')->nullable();
            $table->string('PR')->nullable();
            $table->string('UI')->nullable();
            $table->string('S')->nullable();
            $table->string('C')->nullable();
            $table->string('I')->nullable();
            $table->string('A')->nullable();
            $table->string('ref')->nullable();
            $table->longtext('preuve')->nullable();
            $table->string('image')->nullable();
            $table->string('recommendation')->nullable();
            $table->integer('project_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
