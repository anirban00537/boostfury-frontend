import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Loader2, Package as PackageIcon, X, Plus, Trash2 } from "lucide-react";
import { PackageType, PackageFormData } from "@/types/packages";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { PACKAGE_STATUS } from "@/lib/core-constants";

interface PackageFormProps {
  form: UseFormReturn<PackageFormData>;
  onSubmit: (data: PackageFormData) => void;
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export function PackageForm({
  form,
  onSubmit,
  isLoading,
  isEditing,
  onCancel,
}: PackageFormProps) {
  const [newFeature, setNewFeature] = useState("");
  const watchType = form.watch("type");
  const isTrial = watchType === PackageType.TRIAL;
  const features = form.watch("featuresList") || [];

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues("featuresList") || [];
      form.setValue("featuresList", [...currentFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const currentFeatures = form.getValues("featuresList") || [];
    form.setValue(
      "featuresList",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleSubmit = (data: PackageFormData) => {
    if (isTrial && !data.trial_duration_days) {
      form.setError("trial_duration_days", {
        type: "required",
        message: "Trial duration is required for trial packages",
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <div className="h-[80vh] flex flex-col bg-white rounded-lg">
        {/* Form Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <PackageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {isEditing ? "Edit Package" : "Create New Package"}
                </h2>
                <p className="text-sm text-gray-500">
                  {isEditing
                    ? "Update your package information"
                    : "Fill in the details for your new package"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pro Plan"
                        {...field}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Package Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select package type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={PackageType.TRIAL}>Trial</SelectItem>
                        <SelectItem value={PackageType.MONTHLY}>
                          Monthly
                        </SelectItem>
                        <SelectItem value={PackageType.YEARLY}>
                          Yearly
                        </SelectItem>
                        <SelectItem value={PackageType.LIFETIME}>
                          Lifetime
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(PACKAGE_STATUS).map(([key, value]) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="capitalize"
                        >
                          {key.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Package description..."
                      {...field}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="99.99"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyWordLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Monthly Word Limit
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10000"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        required
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="variantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Variant ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lemon Squeezy Variant ID"
                        {...field}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Product ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lemon Squeezy Product ID"
                        {...field}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {isTrial && (
                <FormField
                  control={form.control}
                  name="trial_duration_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Trial Duration (Days)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter trial duration in days"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          required
                          min="1"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Features List Section */}
            <div className="space-y-4">
              <FormLabel className="text-sm font-medium text-gray-700">
                Features List
              </FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a feature..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 p-2 rounded-md bg-gray-50 border border-gray-200"
                  >
                    <span className="text-sm text-gray-700">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFeature(index)}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {features.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No features added yet
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Form Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
            >
              Cancel
            </Button>
            <GradientButton
              type="submit"
              variant="primary"
              className="shadow-sm px-4 py-2"
              onClick={form.handleSubmit(handleSubmit)}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditing ? "Update Package" : "Create Package"}
            </GradientButton>
          </div>
        </div>
      </div>
    </Form>
  );
}
